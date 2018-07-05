describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length - 8, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    let student1 = {
      name: "FABIOLA",
      stats: {
        percent: 58,
        exercises: {
          total: 5,
          completed: 5,
          percent: 100
        },
        reads: {
          total: 10,
          completed: 3,
          percent: 30
        },
        quizzes: {
          total: 8,
          completed: 8,
          percent: 100,
          scoreSum: 640,
          scoreAvg: 80
        }
      }
    }
    let student2 = {
      name: "LORENA",
      stats: {
        percent: 36,
        exercises: {
          total: 5,
          completed: 0,
          percent: 0
        },
        reads: {
          total: 10,
          completed: 2,
          percent: 20
        },
        quizzes: {
          total: 8,
          completed: 2,
          percent: 25,
          scoreSum: 160,
          scoreAvg: 30
        }
      }
    }
    let student3 = {
      name: "ANDREA",
      stats: {
        percent: 90,
        exercises: {
          total: 5,
          completed: 4,
          percent: 80
        },
        reads: {
          total: 10,
          completed: 5,
          percent: 50
        },
        quizzes: {
          total: 8,
          completed: 4,
          percent: 50,
          scoreSum: 320,
          scoreAvg: 70
        }
      }
    }
    let listStudents = [student1, student2, student3];

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "name", "ASC"), [student3, student1, student2])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "name", "DSC"), [student2, student1, student3])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "percent", "ASC"), [student2, student1, student3])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "percent", "DSC"), [student3, student1, student2])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "exercises", "ASC"), [student2, student3, student1])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "exercises", "DSC"), [student1, student3, student2])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "quizzes", "ASC"), [student2, student3, student1])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "quizzes", "DSC"), [student1, student3, student2])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "quizzesAvg", "ASC"), [student2, student3,student1])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "quizzesAvg", "DSC"), [student1, student3, student2])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "reads", "ASC"), [student2, student1, student3])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      assert.deepEqual(window.sortUsers(listStudents, "reads", "DSC"), [student3, student1, student2])
    });

  });

  describe('filterUsers(users, filterBy)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const processed = computeUsersStats(users, progress, courses);

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)' , () =>{
      assert.deepEqual(filterUsers(processed, 'TERESA')[0].name, 'Teresa Isabel castro castillo');
      assert.deepEqual(filterUsers(processed, 'TERESA').length, 2); 
    });

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    let options = {
      cohort: "lim-2018-03-pre-core-pw",
      cohortData : {
        users,//array en bruto users
        progress,//objeto en bruto progress
        coursesIndex : ["intro"]
      },
      orderBy:"Nombre",
      orderDirection:"ASC",
      search : "LESLIEANDREA"
    }

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      assert.deepEqual(window.processCohortData(options),[
        {
          id:"YolxWuYdppdWodRrE99p2GGvXLR2",
          locale:"es-ES",
          name:"Leslieandrea",
          role:"student",
          signupCohort:"lim-2018-03-pre-core-pw",
          stats: {
            exercises : {
              total: 2,
              completed: 2,
              percent: 100
            },
            percent: 100,
            quizzes : {
              total: 3,
              completed: 3,
              percent: 100,
              scoreSum: 262,
              scoreAvg: 87
            },
            reads: {
              total: 11,
              completed: 11,
              percent: 100
            },
            
          },
          timezone:"America/Lima"
        }
      ]);
    });
  });

})