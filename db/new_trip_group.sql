insert into tripgroup(personid,tripid, email) values(
$1, $2, $3
) returning *