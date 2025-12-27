const hello = [
  {
    "id": "create",
    "type": "button",
    "label": "Create User",
    "icon": "plus",
    "requiredPermission": "create_auction",
    "action": {
      "type": "api",
      "method": "POST",
      "url": "/api/auction/{{asset.id}}",
      "confirmationRequired": true,
      "confirmationMessage": "Are you sure you want to create a new user?"
    },
    "tooltip": "Create a new user account",
    "disabled": false,
    "visible": true,
    "order": 1,
    "group": "user-management",
    "metadata": {
      "dataTestId": "create-user-button"
    }
  },
  {
    "id": "view",
    "type": "button",
    "label": "Create User",
    "icon": "plus",
    "requiredPermission": "view_auction",
    "action": {
      "type": "api",
      "method": "POST",
      "url": "/api/users/{{user.id}}",
      "confirmationRequired": true,
      "confirmationMessage": "Are you sure you want to create a new user?"
    },
    "tooltip": "Create a new user account",
    "disabled": false,
    "visible": true,
    "order": 1,
    "group": "user-management",
    "metadata": {
      "dataTestId": "create-user-button"
    }
  },
  {
    "id": "update",
    "type": "button",
    "label": "Create User",
    "icon": "plus",
    "requiredPermission": "update_auction",
    "action": {
      "type": "api",
      "method": "POST",
      "url": "/api/users/{{user.id}}",
      "confirmationRequired": true,
      "confirmationMessage": "Are you sure you want to create a new user?"
    },
    "tooltip": "Create a new user account",
    "disabled": false,
    "visible": true,
    "order": 1,
    "group": "user-management",
    "metadata": {
      "dataTestId": "create-user-button"
    }
  },
  {
    "id": "delete",
    "type": "button",
    "label": "Edit User",
    "icon": "user-edit",
    "requiredPermission": "delete_auction",
    "action": {
      "type": "route",
      "path": "/users/{{asset.id}}/edit",
      "params": {
        "id": "{{userId}}"
      }
    },
    "tooltip": "Edit existing user details",
    "disabled": false,
    "visible": true,
    "order": 2,
    "group": "user-management",
    "metadata": {
      "dataTestId": "edit-user-button"
    }
  }
]
module.exports = { hello }