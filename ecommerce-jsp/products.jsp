<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<html>
<head><title>Products</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/css/styles.css">
</head>
<body>
    <h2>Products</h2>
    <%
        String[][] products = {
            {"1", "Laptop", "45000"},
            {"2", "Smartphone", "20000"},
            {"3", "Headphones", "1500"}
        };
    %>
    <table border="1">
        <tr><th>ID</th><th>Name</th><th>Price</th><th>Action</th></tr>
        <%
            for (String[] p : products) {
        %>
        <tr>
            <td><%= p[0] %></td>
            <td><%= p[1] %></td>
            <td>₹<%= p[2] %></td>
            <td><a href="addToCart.jsp?id=<%= p[0] %>&name=<%= p[1] %>&price=<%= p[2] %>">Add to Cart</a>
            </td>
        </tr>
        <% } %>
    </table>
    <a href="cart.jsp">Go to Cart</a>
</body>
</html>
