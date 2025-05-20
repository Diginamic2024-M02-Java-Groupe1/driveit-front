# Node Image
FROM node

# Change current working directory
WORKDIR /app

# Define exposed port
# EXPOSE 3000

# Start app in development mode
CMD [ "npm", "start" ]