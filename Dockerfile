FROM node:current-alpine@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797

# small runtime deps
RUN apk add --no-cache ca-certificates

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

CMD ["npm", "run",  "start"]
