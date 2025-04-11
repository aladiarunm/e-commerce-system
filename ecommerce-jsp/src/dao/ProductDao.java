package dao;

import java.util.ArrayList;
import java.util.List;
import model.Product;

public class ProductDao {
    public static List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        products.add(new Product("1", "Wireless Mouse", 599.00));
        products.add(new Product("2", "Gaming Keyboard", 1299.00));
        products.add(new Product("3", "Laptop Stand", 799.00));
        return products;
    }

    public static Product getProductById(String id) {
        for (Product p : getAllProducts()) {
            if (p.getId().equals(id)) {
                return p;
            }
        }
        return null;
    }
}
