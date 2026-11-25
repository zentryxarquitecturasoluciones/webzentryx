# Web Zentryx

Sitio web estático de Data Zentryx.

- Dominio: `datazentryxarquitectsolutions.com`
- Registros DNS en FreeDNS:
  - `A` root → `216.198.79.1`
  - `CNAME www` → `873171c31b0dd2a9.vercel-dns-017.com`
- Despliegue: Vercel, proyecto `webzentryx`, equipo `zentryx5`.

El dominio debe estar delegado en el registrador a `NS1.AFRAID.ORG`, `NS2.AFRAID.ORG`, `NS3.AFRAID.ORG` y `NS4.AFRAID.ORG` para que Vercel pueda verificarlo y emitir el certificado.
