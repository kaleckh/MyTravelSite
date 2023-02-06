insert into trips(person_id,triplocation, tripstartdate, tripenddate, tripstate) values(
$1, $2, $3, $4, $5
) returning *