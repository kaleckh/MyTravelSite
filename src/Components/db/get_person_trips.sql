select t.* from peopletravelling pt
inner JOIN trips t on t.person_id = pt.id
where pt.id = $1;