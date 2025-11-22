# AuctionPeak
Auction site from future
FrontEnd
  TODO: create dashboard page
  TODO: fix the gridlayout
  TODO: action buttons map
  TODO: check the image reloading issue and move the state layout to url or localstorage 
  TODO: fix the action button code ..make it centralized
  TODO: Add multi-theme support with tenant-specific branding
  TODO: Implement role-based access control (RBAC) UI components
  TODO: Create tenant onboarding workflow and setup wizard
  TODO: Add white-labeling capabilities
  TODO: Build usage analytics dashboard
  TODO: Create subscription management portal
  TODO: Add tenant-specific configuration UI
  TODO: Implement internationalization (i18n) support
  TODO: Create component library with design system
  TODO: Add progressive web app (PWA) capabilities
  TODO: Build offline support and data sync
  TODO: Implement tenant isolation in state management
  TODO: Add real-time collaboration features
  TODO: Create customizable email templates
  TODO: Build tenant-specific reporting dashboards
  TODO: Add support for custom domains and SSL
  TODO: Implement feature flag toggles in UI
  TODO: Create tenant user management interface
  TODO: Add audit log viewer
  TODO: Build API playground/documentation UI
  TODO: Implement tenant-specific analytics
  TODO: Add automated testing framework
  TODO: Create performance monitoring dashboard
  TODO: Build tenant billing management UI
  TODO: Implement usage quota monitoring
  TODO: Add tenant support ticket system
  TODO: Create tenant activity feeds
  TODO: Build notification preferences UI
  TODO: Implement tenant data import/export
  TODO: Add tenant-specific help documentation
  TODO: Create tenant feedback collection system
BackEnd
  TODO: field extraction based on rule
  TODO: create dashbaord page
  TOOD: pagination support
  TODO: Add multi-tenancy support with tenant isolation
  TODO: Implement rate limiting and usage quotas per tenant/user
  TODO: Add webhook support for auction events (start, end, bid, etc)
  TODO: Create API versioning system
  TODO: Add caching layer (Redis) for frequently accessed data
  TODO: Implement background job processing for auction scheduling
  TODO: Add analytics and reporting capabilities
  TODO: Create subscription billing integration
  TODO: Add audit logging for all operations
  TODO: Implement configurable business rules engine
  TODO: Add support for multiple payment gateways
  TODO: Create admin dashboard for tenant management
  TODO: Add automated backup and restore functionality
  TODO: Implement horizontal scaling capabilities
  TODO: Add API documentation and SDK generation
  TODO: Create tenant-specific customization options
  TODO: Add support for multiple currencies
  TODO: Implement real-time notifications system
  TODO: Add data export/import capabilities
  TODO: Create API throttling mechanisms
  TODO: Add support for custom domains per tenant
  TODO: Implement feature flags management


  ## Seed data in database
  ```
  npx sequelize-cli db:seed:all
  ```

  ## Seed single file 
  ```
  npx sequelize-cli db:seed --seed name-of-your-seeder-file.js
  ```