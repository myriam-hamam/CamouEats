[readme.md](https://github.com/user-attachments/files/21703771/readme.md)[Uploa# CampuEats – Your MIU Food Hub

## Project Overview

CampuEats is a web-based food ordering platform designed specifically for university campuses.  
It enables students, staff, and visitors to browse available restaurants both inside and outside the campus, view menus, and place orders conveniently from any device.

---

## Key Features

- **Restaurant Listing & Filtering**  
  - Categorized as Inside Campus and Outside Campus.  
  - Each restaurant has a dedicated page displaying its logo, name, and estimated delivery time.

- **Menu Display**  
  - Dynamic loading of menu items for each restaurant from JSON files.  
  - Each menu item includes name, price, and an "Add to Cart" button.

- **Shopping Cart**  
  - Users can add multiple items from a restaurant.  
  - Cart data is saved using `localStorage` to persist across pages.  
  - Real-time display of total item count and total price.

- **Checkout Page**  
  - Shows selected restaurant’s logo and name.  
  - Lists all items in the order with quantities and prices.  
  - Automatically calculates subtotal, delivery fee, tax, and total.  
  - Provides a "Place Order" button to finalize the purchase.

- **Responsive Design**  
  - Styled with `universal-styles.css` to ensure a consistent look and feel.  
  - Fully responsive and works smoothly on desktop, tablet, and mobile devices.

---

## Technical Details

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)  
- **Data Handling:** JSON files for storing restaurant menus  
- **State Management:** `localStorage` to save cart and restaurant info between pages

---

## Code Structure

| File               | Description                                             |
|--------------------|---------------------------------------------------------|
| `restaurant.html`  | Displays menu items for a specific restaurant           |
| `restaurant.js`    | Handles adding items to cart and saving to `localStorage`|
| `checkout.html`    | Shows the cart and calculates totals                    |
| `checkout.js`      | Loads cart data, displays items, and manages checkout   |
| `universal-styles.css` | Global CSS styles for consistent design across pages    |

---

## Why JSON & localStorage?

- **JSON** provides a lightweight and easy-to-update way to store restaurant menu data without editing HTML directly.  
- **localStorage** ensures that users’ shopping carts persist across page reloads and navigations, enhancing user experience without needing backend support.

---

## How It Works

1. User visits a restaurant page.  
2. Menu items load dynamically from JSON.  
3. User clicks “Add to Cart” for desired items.  
4. Cart data (items, quantities, restaurant info) is saved in `localStorage`.  
5. User navigates to the Checkout page, where cart contents are loaded and totals are calculated.  
6. User confirms order by clicking “Place Order”.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or suggestions, feel free to reach out.

---

*Happy coding and bon appétit! 🍕🍔🥗*ding readme.md…]()
