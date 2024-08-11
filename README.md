# node-react-simple
backend node expres, frontend react

## backend
### Prerequisite

- nodejs + express
- postgres sql
- sequelize
- typescript
- rabbitmq
- smtp

### Instalation
- Move To Directory
```
cd backend
```
- Install dependencies
```
npm install
```
- Copy **.env.example** as **.env**
```
cp .env.example .env
```
- Adjust environment according to the your locale
```
PORT=3000
#database
DB_DATABASE=nodereact
DB_USERNAME=postgres
DB_PASSWORD=namamu
DB_HOST=localhost
DB_PORT=5435
#jwt
JWT_SECRET=D3PcOxZ?t0n6xoDB-aHHjBVsS9tK/nOKlOmZb7jxmG8BDYUTrnL?/56nkU4gYAU?
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

#email
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=e24efcb773a596
SMTP_PASS=a3d9958a1e4079

#rabbitmq
RABBITMQ_URL=localhost
RABBITMQ_PORT=5672
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
``
- Run migrations
```
npx sequelize-cli db:migrate
```
- Running Application
```
npm start
``
## frontend
### Prerequisite

- reactjs
- redux
- vite
- flowbite + tailwindcss

### Instalation
- Move To Directory
```
cd backend
```
- Install dependencies
```
npm install
```
- Copy **.env.example** as **.env**
```
cp .env.example .env
```
- Adjust environment according to the your locale
```
VITE_API_URL=http://localhost:3000/api/v1
```
- Running application
```
npm run dev
```
