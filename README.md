# Web Zentryx

Sitio web estático de Data Zentryx.

- Dominio: `datazentryxarquitectsolutions.com`
- Registros DNS en FreeDNS:
  - `A` root → `76.76.21.21`
  - `CNAME www` → `cname.vercel-dns.com`
- Despliegue: Vercel, proyecto `webzentryx`, equipo `zentryx5`.

El dominio debe estar delegado en el registrador a `NS1.AFRAID.ORG`, `NS2.AFRAID.ORG`, `NS3.AFRAID.ORG` y `NS4.AFRAID.ORG` para que Vercel pueda verificarlo y emitir el certificado.
