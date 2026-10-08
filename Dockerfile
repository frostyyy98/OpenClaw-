FROM node:22-bookworm

WORKDIR /app

# Install OpenClaw
RUN npm install -g openclaw

# Copy Luna backend
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 10000

CMD ["sh", "start.sh"]
