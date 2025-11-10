# ---------- build stage ----------
FROM node:current-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# ---------- runtime stage ----------
FROM node:current-alpine AS runner

# small runtime deps
RUN apk add --no-cache ca-certificates

WORKDIR /app

# only install production deps
COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci --omit=dev

# copy compiled app from builder
COPY --from=builder /usr/src/app/dist ./dist

# non-root runtime user
RUN addgroup -S app && adduser -S app -G app
USER app

ENV PORT=3000

EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
