insert into trips(person_id,triplocation, tripstartdate, tripenddate, tripstate, description, owner_email) values(
$1, $2, $3, $4, $5, $6, $7
) returning *