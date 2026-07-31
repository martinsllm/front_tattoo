# API Dashboard Admin

GET /me
- Autenticação: sim
- Autorização: admin
- Usado para: nome/e-mail do usuário no header do dashboard

GET /metrics
- Autenticação: sim
- Autorização: admin
- Usado para:
  - total de artistas cadastrados
  - total de avaliações recebidas
  - total geral de favoritos
- Dado esperado:
  - total_artists: number
  - total_reviews: number
  - total_favorites: number