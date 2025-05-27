# Shine Legend Frontend

This is the frontend application for Shine Legend, a window cleaning service based in Kingston, Ontario, Canada. The application allows users to book appointments online and includes an admin dashboard for managing bookings.

## Features

- **Online Booking Flow:** Users can select service type, enter estimated window count and address, choose a time slot from a calendar, and proceed to a payment step.
- **Service Summary:** Displays booking details and estimated price.
- **Calendar Selector:** Integrates FullCalendar.js for selecting available time slots.
- **Payment Form:** (Currently a placeholder) for integrating payment processing like Stripe.
- **Admin Dashboard:** (Password protected - default: `shineadmin`) Provides a table view of bookings with actions (Reschedule, Cancel, Mark Complete) and CSV export.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shine-Legend/Frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```

## Running the App

To run the app in development mode:

```bash
npm start
# or yarn start
```

The app will be available at `http://localhost:3000`.

## Deployment

This application is deployed and available at:

[https://shinelegend.surge.sh](https://shinelegend.surge.sh)

## Admin Access

The Admin Dashboard is password protected.
- **Default Password:** `shineadmin`

**Note:** This is a simple client-side password for demonstration purposes. For a production application, you would need a secure backend authentication system.

---

Would you like me to create this `README.md` file in your project root?
