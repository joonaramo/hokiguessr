# Notes

## Database model
- User
  - id
  - email
  - username
  - password
  - points
  - predictions
  - is_admin
- Player
  - id
  - points_ratio
- Prediction
  - id
  - user_id
  - points
  - date
  - players
  - completed (boolean)
  - correct (boolean)
- Goals
  - id
  - player_id