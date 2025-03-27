import { BasicColumn } from './board.model.ts';

export const dummyData: BasicColumn[] = [
  {
    name: 'План на месяц',
    children: [
      { id: crypto.randomUUID(), value: 'Пройти курс по React' },
      { id: crypto.randomUUID(), value: 'Отметить день рождение' },
      {
        id: crypto.randomUUID(),
        value:
          'Записаться на курсы английского языка, чтобы уехать жить в Лондон',
      },
      {
        id: crypto.randomUUID(),
        value: 'Сделать бекенд своего сайта на node.js',
      },
      {
        id: crypto.randomUUID(),
        value: 'Собрать портфолио',
      },
      {
        id: crypto.randomUUID(),
        value: 'Написать первую статью в блог',
      },
      {
        id: crypto.randomUUID(),
        value:
          'Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.',
      },
      {
        id: crypto.randomUUID(),
        value: 'Нет, я серьезный человек, иду в мотошколу. Записываюсь!',
      },
    ],
    id: crypto.randomUUID(),
  },
  {
    name: 'План на день',
    id: crypto.randomUUID(),
    children: [
      { value: 'Записаться на курс по React', id: crypto.randomUUID() },
      { value: 'Забронировать тир на субботу', id: crypto.randomUUID() },
      { value: 'Накидать тем для статей в блог', id: crypto.randomUUID() },
      { value: 'Сделать колонку Итоги', id: crypto.randomUUID() },
    ],
  },
  {
    name: 'Итоги',
    id: crypto.randomUUID(),
    children: [],
  },
];
