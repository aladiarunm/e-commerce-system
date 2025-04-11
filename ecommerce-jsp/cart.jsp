<%@ page language="java" contentType="text/html; charset=UTF-8" session="true" %>
<%@ page import="java.util.*" %>

<html>
<head><title>Your Cart</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/css/styles.css">
</head>
<body>
<h2>🛒 Your Shopping Cart</h2>

<%
    List<String[]> cart = (List<String[]>) session.getAttribute("cart");

    if (cart == null || cart.isEmpty()) {
%>
    <p>Your cart is empty 😢</p>
<%
    } else {
        int total = 0;
%>
    <table border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>ID</th><th>Name</th><th>Price</th>
        </tr>
<%
        for (String[] item : cart) {
            total += Integer.parseInt(item[2]);
%>
        <tr>
            <td><%= item[0] %></td>
            <td><%= item[1] %></td>
            <td>₹<%= item[2] %></td>
        </tr>
<%
        }
%>
        <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>₹<%= total %></strong></td>
        </tr>
    </table>
<%
    }
%>

<br><a href="products.jsp">⬅️ Back to Products</a>
</body>
</html>
