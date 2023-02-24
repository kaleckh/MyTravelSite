insert into trips(person_id,triplocation, tripstartdate, tripenddate, tripstate, description) values(
$1, $2, $3, $4, $5, $6
) returning *