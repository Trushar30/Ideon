# Agri Connect (Farmers Marketplace)

## Problem Statement
Farmers often struggle to get fair prices for their produce due to the involvement of multiple middlemen in the supply chain. On the other hand, consumers pay higher prices and often lack information about the source of their food. There is a need for a platform that bridges the gap between farmers and consumers, allowing for direct trade, better prices for farmers, and fresh produce for consumers.

## In-Depth Project Explanation
**Agri Connect** is a transformative mobile platform designed to effectively deconstruct the traditional agricultural supply chain. By removing middlemen, the platform ensures that farmers receive fair compensation for their hard work while consumers get access to fresh, organic produce at reasonable prices.

The application serves three distinct ecosystems:
1.  **Farmers**: Empowered with digital tools to list products, manage inventory, and track orders in real-time.
2.  **Consumers**: Provided with a seamless marketplace to browse locally grown produce, read farmer profiles, and purchase securely.
3.  **Community (NGOs)**: A unique integration that allows users to support local NGOs through donations, fostering a sense of community responsibility.

## Key Features and Highlights
### 📱 Comprehensive User Experience
-   **Multilingual System**: The application features robust support for **English**, **Hindi**, and **Gujarati**, making it accessible to wider demographics.
-   **Role-Based Interfaces**: Distinct, tailored dashboards for Farmers (management-focused) and Consumers (discovery-focused).
-   **Secure Authentication**: powered by Supabase Auth for safe and persistent user sessions.

### 🧑‍🌾 Farmer Ecosystem
-   **Dashboard Analytics**: Real-time insights into total sales, active orders, and revenue.
-   **Inventory Control**: Easy-to-use tools for adding, updating, or removing produce listings with image uploads.
-   **Order Fulfillment**: Structured workflow to manage orders from 'Pending' to 'Delivered'.

### 🛒 Consumer Marketplace
-   **Smart Discovery**: Category-based filtering and search capabilities.
-   **Farmer Transparency**: Detailed farmer profiles allowing consumers to know the source of their food.
-   **Interactive Cart**: Seamless add-to-cart and checkout experience.
-   **Donation Module**: Dedicated section to view NGOs and make donations, complete with digital certificates.

## Architecture and Workflow Overview
The Agri Connect application is built on a scalable **MVVM (Model-View-ViewModel)** architecture, leveraging the power of **Flutter** for the frontend and **Supabase** for the backend.

### Core Architectural Layers
1.  **Presentation Layer (`lib/screens`, `lib/widgets`)**:
    -   Responsive UI components built with detailed flows for functionality.
    -   Utilizes `flutter_animate` for engaging micro-interactions and `google_fonts` for modern typography.
2.  **State Management Layer (`lib/providers`)**:
    -   Uses the `Provider` pattern to decouple business logic from UI code.
    -   **`AuthProvider`**: Handles persistent user sessions and role validation.
    -   **`NGOProvider`, `ProductProvider`, `OrderProvider`**: Manage asynchronous data fetching, caching, and UI state synchronization.
3.  **Data & Service Layer (`lib/services`, `lib/models`)**:
    -   **Supabase Client**: Direct interface with the backend services.
    -   **PostgreSQL**: Relational data storage ensuring data integrity for Users, Products, and Orders.
    -   **Realtime**: Leveraging Supabase Realtime for instant updates on order status changes.

### User Workflow
1.  **Onboarding**: Users sign up/login and self-identify as a Farmer or Consumer. Language preferences are applied globally.
2.  **Core Interaction**:
    -   *Farmers* populate the marketplace with fresh produce.
    -   *Consumers* browse these listings, adding items to a global cart.
3.  **Transaction**:
    -   Orders are placed and stored in Supabase.
    -   Farmers see new orders instantly on their dashboard.
    -   Status updates (Confirmed/Shipped) are reflected in real-time for the consumer.
## Tech Stack
### Frontend / Mobile App
- **Framework**: [Flutter](https://flutter.dev/) (Dart)
- **State Management**: `provider`
- **UI Components**: `flutter_svg`, `flutter_animate`, `google_fonts`
- **Utility**: `image_picker`, `uuid`, `intl`, `shared_preferences`

### Backend / Database
- **Platform**: [Supabase](https://supabase.com/)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth

## Screenshots / UI Previews
*Currently, there are no screenshots available in the repository.*

To view the UI, you can run the application locally:
1. Ensure you have Flutter installed.
2. Set up your `.env` file with Supabase credentials.
3. Run `flutter run`.

User Interfaces are organized into:
- **Auth**: Login and Registration screens.
- **Consumer**: Marketplace viewing and ordering screens.
- **Farmer**: Dashboard and management screens.

## Live Deployed Website / Demo Link
- **Project Walkthrough / Video**: [Google Drive Link](https://drive.google.com/drive/folders/19nWJHweTjhogcyqt6xxbqKAUEKoUxeN5)
- **Hackathon**: Odoo x Gujarat Vidhyapith Hackathon '25
- **Team**: FarmFusion
