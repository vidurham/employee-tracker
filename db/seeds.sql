INSERT INTO departments
  (name)
VALUES
  ('Sales'), 
  ('Engineering'), 
  ('Customer Service'),
  ('Marketing');

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Sales Manager', 60000, 1),
  ('Sales Intern', 40000, 1),
  ('Head Engineer', 80000, 2),
  ('Electrical Engineer', 65000, 2),
  ('Testing Engineer', 45000, 2),
  ('Customer Service Agent', 40000, 3),
  ('Marketing Manager', 65000, 4),
  ('Marketing Intern', 40000, 4);

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Johnny', 'Walker', 1, null),
  ('Tommy', 'TwoShoes', 2, 1),
  ('Alan', 'Anderson', 3, null),
  ('Malachi', 'Smith', 4, 3),
  ('Alexa', 'Templeton', 5, 3),
  ('Mufasa', 'Clydesdale', 6, 1),
  ('Jordan', 'Longstaff', 7, null),
  ('Kylie', 'Wilson', 8, 7);