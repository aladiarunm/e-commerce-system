<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>ShopIt - Home</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/css/styles.css">
</head>
<body>
    <div class="home-container">
        <h1>🛍️ Welcome to <span class="highlight">ShopIt</span></h1>
        <p>Your one-stop shop for the best deals!</p>

        <div class="home-buttons">
            <a href="products.jsp" class="btn">🛒 View Products</a>
            <a href="cart.jsp" class="btn secondary">🧺 View Cart</a>
        </div>
    </div>
</body>
</html>

