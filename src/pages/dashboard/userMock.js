export const UserMock = {
  sections: [
    {
      title: 'דיור',
      rows: [
        { expense: 'קבוע', kind: 'שכר דירה', amount: '' },
        { expense: 'קבוע', kind: 'חשמל', amount: '' },
        { expense: 'משתנה', kind: 'כלי עבודה', amount: '' },
        { expense: '', kind: '', amount: '' },
      ],
    },
    {
      title: 'רכב',
      rows: [
        { expense: 'קבוע', kind: 'דלק', amount: '1500' },
        { expense: 'קבוע', kind: 'ניקוי', amount: '40' },
        { expense: 'משתנה', kind: 'תיקונים', amount: '2500' },
        { expense: '', kind: '', amount: '' },
      ],
    },
    {
      title: 'תקשורת',
      rows: [
        { expense: 'קבוע', kind: 'פלאפון', amount: '5000' },
        { expense: 'קבוע', kind: 'מגן מסך', amount: '100' },
        { expense: 'משתנה', kind: 'סלקום', amount: '150' },
        { expense: '', kind: '', amount: '' },
      ],
    },
  ],
};
