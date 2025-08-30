# बिल्ड स्टेज
FROM node:18-alpine as build

# वर्किंग डायरेक्टरी सेट करें
WORKDIR /app

# पैकेज.जेसन और पैकेज-लॉक.जेसन कॉपी करें
COPY package*.json ./

# डिपेंडेंसीज इंस्टॉल करें
RUN npm install

# सोर्स कोड कॉपी करें
COPY . .

# प्रोडक्शन बिल्ड बनाएं
RUN npm run build

# प्रोडक्शन स्टेज
FROM nginx:alpine

# बिल्ड स्टेज से बिल्ड आउटपुट कॉपी करें
COPY --from=build /app/build /usr/share/nginx/html

# Nginx कॉन्फिगरेशन कॉपी करें
COPY nginx.conf /etc/nginx/conf.d/default.conf

# पोर्ट एक्सपोज़ करें
EXPOSE 80

# Nginx स्टार्ट करें
CMD ["nginx", "-g", "daemon off;"]