const { neon } = require("@neondatabase/serverless")

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value, maxLength) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ success: false, error: "Método no permitido" })
  }

  const body = req.body && typeof req.body === "object" ? req.body : {}

  if (clean(body.website, 200)) {
    return res.status(200).json({ success: true })
  }

  const name = clean(body.name, 120)
  const company = clean(body.company, 160)
  const phone = clean(body.phone, 40)
  const email = clean(body.email, 160)
  const notes = clean(body.notes, 4000)

  if (!name || !company || !email) {
    return res.status(400).json({ success: false, error: "Nombre, empresa y correo son obligatorios" })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ success: false, error: "Ingresa un correo electrónico válido" })
  }

  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
  if (!databaseUrl) {
    return res.status(500).json({ success: false, error: "La base de datos no está configurada" })
  }

  try {
    const sql = neon(databaseUrl)
    await sql.query(
      "INSERT INTO meeting_requests (name, company, phone, email, notes, status, source) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, company, phone, email, notes, "pendiente", "website"],
    )
    return res.status(201).json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo registrar la solicitud"
    return res.status(500).json({ success: false, error: message })
  }
}
