--from chat gpt
CREATE TABLE foreign_schools (
    id SERIAL PRIMARY KEY,
    facility_code TEXT,
    institution TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    type TEXT,
    bah NUMERIC,
    tuition_in_state NUMERIC,
    tuition_out_of_state NUMERIC,
    books NUMERIC,
    net_balance NUMERIC GENERATED ALWAYS AS (bah - tuition_in_state) VIRTUAL
);

--I wrote
CREATE TABLE schools(
    id facility_code PRIMARY KEY,
    institution TEXT,
    city TEXT,
    country TEXT
)

CREATE TABLE countries(
    id SERIAL PRIMARY KEY,
    country TEXT,
    costOfLiving NUMERIC
)

