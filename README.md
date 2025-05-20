# 🌍 Oz Map API

API RESTful desenvolvida com Node.js, Express e TypeScript, que oferece funcionalidades geoespaciais para gerenciamento de regiões baseadas em coordenadas e busca de endereços.

---

## 🚀 Tecnologias utilizadas

- Node.js 22+
- TypeScript
- Express
- MongoDB 8+ via container (Docker)
- Mongoose
- Mocha, Chai, Supertest (testes unitários e de integração)
- Joi (validação)
- Swagger (documentação)
- Winston (logs)
- ESLint + Prettier (padronização)

---

## 📦 Instalação

```bash
git clone git@github.com:ramondfalcao/oz_map.git
cd oz-map
npm install
```

## ⚙️ Variáveis de Ambiente
```bash
PORT=3001
MONGO_URI=mongodb://localhost:27017/oz_map_db
GEOCODE_COUNTRY_CODE=BR
```

## 📚 Documentação Swagger
A documentação da API está disponível após iniciar a aplicação:

🔗 http://localhost:3001/docs

## 🧪 Testes

Para rodar os testes:
```bash
npm test
```

Para rodar apenas testes de integração:
```bash
npm run test:integration
```

Para rodar apenas testes unitarios:
```bash
npm run test:unit
```

Para gerar relatório de cobertura com o nyc:
```bash
npm run coverage
```

## 📌 Endpoints principais

> **GET** -> /api/regions – Listar todas as regiões

> **POST** /api/regions – Criar nova região

> **GET**  /api/regions/contains-point – Listar regiões que contêm um ponto

> **GET**  /api/regions/near – Listar regiões próximas a um ponto

> **GET**  /api/regions/geolocation-by-addresss – Listar regiões com base em endereço
 
> **GET** /docs – Swagger

## 🗺️ Exemplo de região (GeoJSON)

```json
{
  "name": "Região Teste",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[lng1, lat1], [lng2, lat2], [lng3, lat3], [lng1, lat1]]]
  }
}
```