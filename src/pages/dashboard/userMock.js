export const UserMock = {
  sections: [
    {
      title: 'דיור',
      rows: [
        { expense: 'קבוע', kind: 'שכר דירה', amount: 0 },
        { expense: 'קבוע', kind: 'חשמל', amount: 0 },
        { expense: 'משתנה', kind: 'כלי עבודה', amount: 0 },
        { expense: 0, kind: 0, amount: 0 },
      ],
    },
    {
      title: 'רכב',
      rows: [
        { expense: 'קבוע', kind: 'דלק', amount: '1500' },
        { expense: 'קבוע', kind: 'ניקוי', amount: '40' },
        { expense: 'משתנה', kind: 'תיקונים', amount: '2500' },
        { expense: 0, kind: 0, amount: 0 },
      ],
    },
    {
      title: 'תקשורת',
      rows: [
        { expense: 'קבוע', kind: 'פלאפון', amount: '5000' },
        { expense: 'קבוע', kind: 'מגן מסך', amount: '100' },
        { expense: 'משתנה', kind: 'סלקום', amount: '150' },
        { expense: 0, kind: 0, amount: 0 },
      ],
    },
  ],
};
