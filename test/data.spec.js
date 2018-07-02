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
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
   const courses = Object.keys(cohort.coursesIndex);
   const { users, progress } = fixtures;
    const processed = computeUsersStats(users, progress, courses);

    it('debería retornar arreglo de usuarios ordenado por nombre ASC',()=>{
      assert.deepEqual(sortUsers(processed, 'name', 'asc')[0].name, 'adriana vizcarra paitán');
      assert.deepEqual(sortUsers(processed, 'name', 'asc')[727].name, 'Zurisadai Rosas Aramburú');
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () =>{
      assert.deepEqual(sortUsers(processed, 'name', 'dsc')[0].name, 'Zurisadai Rosas Aramburú');
      assert.deepEqual(sortUsers(processed, 'name', 'dsc')[727].name, 'adriana vizcarra paitán');
    })
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () =>{
      assert.deepEqual(sortUsers(processed, 'percent', 'asc')[0].stats.percent, '0');
      assert.deepEqual(sortUsers(processed, 'percent', 'asc')[727].stats.percent, '100');
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', ()=>{
      assert.deepEqual(sortUsers(processed, 'percent', 'dsc')[0].stats.percent, '100');
      assert.deepEqual(sortUsers(processed, 'percent', 'dsc')[727].stats.percent, '0');
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', ()=>{
      assert.deepEqual(sortUsers(processed, 'exercises', 'asc')[0].stats.exercises.completed, '0');
      assert.deepEqual(sortUsers(processed, 'exercises', 'asc')[727].stats.exercises.completed, '2');
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', ()=>{
      assert.deepEqual(sortUsers(processed, 'exercises', 'dsc')[0].stats.exercises.completed, '2');
      assert.deepEqual(sortUsers(processed, 'exercises', 'dsc')[727].stats.exercises.completed, '0');
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', ()=>{
      assert.deepEqual(sortUsers(processed, 'quizzes', 'asc')[0].stats.quizzes.completed, '0');
      assert.deepEqual(sortUsers(processed, 'quizzes', 'asc')[727].stats.quizzes.completed, '3');
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', ()=>{
      assert.deepEqual(sortUsers(processed, 'quizzes', 'dsc')[0].stats.quizzes.completed, '3');
      assert.deepEqual(sortUsers(processed, 'quizzes', 'dsc')[727].stats.quizzes.completed, '0');
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', ()=>{
      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'asc')[0].stats.quizzes.scoreAvg, '0');
      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'asc')[727].stats.quizzes.scoreAvg, '100');
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', ()=>{
      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'dsc')[0].stats.quizzes.scoreAvg, '100');
      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'dsc')[727].stats.quizzes.scoreAvg, '0');
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', ()=>{
      assert.deepEqual(sortUsers(processed, 'reads', 'asc')[0].stats.reads.completed, '0');
      assert.deepEqual(sortUsers(processed, 'reads', 'asc')[727].stats.reads.completed, '100');
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', ()=>{
      assert.deepEqual(sortUsers(processed, 'reads', 'dsc')[0].stats.reads.completed, '100');
      assert.deepEqual(sortUsers(processed, 'reads', 'dsc')[727].stats.reads.completed, '0');
    });

  });

  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter',()=>{
      const options = {
        cohort: ["intro"],
        cohortData: {
          users: users,
          progress: progress,
        },
        orderBy: 'Porcentaje',
        orderDirection: 'DES',
        search: 'andrea'
      }

      assert.equal(processCohortData(options)[0].name , 'Andrea');
      assert.equal(processCohortData(options)[0].stats.percent , '100%');
      assert.equal(processCohortData(options)[11].name , 'Andrea Bernal');
      assert.equal(processCohortData(options)[11].stats.percent , '7%');
      assert.equal(processCohortData(options).length , 11);

    });

  });

});

