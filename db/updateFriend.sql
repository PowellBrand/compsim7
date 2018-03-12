update friends
set (name, location) = ($1, $2)
where friendid = $3
returning *