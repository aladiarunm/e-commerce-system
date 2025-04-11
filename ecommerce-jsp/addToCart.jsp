<%@ page language="java" contentType="text/html; charset=UTF-8" session="true" %>
<%@ page import="java.util.*" %>

<%
    // Get product details from the request
    String id = request.getParameter("id");
    String name = request.getParameter("name");
    String price = request.getParameter("price");

    // Make sure all parameters are present
    if (id != null && name != null && price != null) {
        // Get the cart list from session
        List<String[]> cart = (List<String[]>) session.getAttribute("cart");

        // Initialize cart if it doesn't exist
        if (cart == null) {
            cart = new ArrayList<>();
        }

        // Add product to cart
        cart.add(new String[]{id, name, price});
        session.setAttribute("cart", cart);
%>

<html>
<head><title>Item Added</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/css/styles.css">
</head>
<body>
    <h2>✅ Item "<%= name %>" added to cart!</h2>
    <a href="products.jsp">🛍️ Continue Shopping</a> | 
    <a href="cart.jsp">🛒 View Cart</a>
</body>
</html>

<%
    } else {
%>
<html>
<head><title>Error</title></head>
<body>
    <h2 style="color:red;">❌ Error: Missing product details!</h2>
    <a href="products.jsp">Back to Products</a>
</body>
</html>
<%
    }
%>