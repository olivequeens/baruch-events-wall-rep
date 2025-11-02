# Baruch Events Wall

## Overview
A React-based campus event dashboard that displays daily events from various clubs and organizations. Users can view events filtered by date and manage event data through CSV import.

## Project Setup
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Dev Server**: Port 5000, bound to 0.0.0.0

## Features
- Daily event display with filtering by date
- CSV data import/export via settings modal
- Local storage persistence
- Instagram and WhatsApp source badges
- Sample data included for initial setup
- Responsive grid layout (3 columns on desktop)

## Architecture
- Single-page application using React hooks
- Client-side CSV parsing
- LocalStorage for data persistence
- Component structure:
  - `App.jsx` - Main application component
  - `EventCard` - Individual event display
  - `SettingsModal` - CSV data management UI

## Recent Changes
- 2025-11-02: Initial project setup in Replit environment
- Configured Vite with host allowance for proxy support
- Set up Tailwind CSS integration
