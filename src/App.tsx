import './App.css';
import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

interface IMonument {
  id: number;
  title: string;
  description: string;
  image: string;
}

const monuments: IMonument []= [
  {
    id: 1,
    title: 'Памятник А. С. Пушкину в Симбирске, 1833 год',
    description: 'Дата открытия — 13 сентября 2026 года. Памятник посвящён приезду великого русского поэта Александра Пушкина в Симбирск.',
    image: 'pushkin.jpg',
  },
  {
    id: 2,
    title: 'Памятник молодым строителям и авиастроителям',
    description: 'Дата открытия — 19 июня 2026 года. Скульптурная композиция установлена на облицованном мрамором постаменте.',
    image: 'plane.jpg',
  },
  {
    id: 3,
    title: 'Эхо времён: мелодии памяти',
    description: 'Дата открытия — 4 мая 2025 года. Памятник около бывшего железнодорожного вокзала Ульяновска.',
    image: 'station.jpg',
  },
  {
    id: 4,
    title: 'Русскому хоккею',
    description: 'Дата открытия — 23 июня 2023 года. Памятник около дворца спорта «Волга-Спорт-Арена», посвящённый хоккею.',
    image: 'Hockey.jpg',
  },
  {
    id: 5,
    title: 'Памятник мостостроителям',
    description: 'Дата открытия — 25 августа 2021 года. Данный монумент находится в Ульяновске.',
    image: 'Bridge.jpg',
  },
];

export const App = () => {
  const [user, setUser] = useState<{ first_name?: string } | null>(null);

  useEffect(() => {
    bridge
      .send('VKWebAppGetUserInfo')
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, );

  return (
    <div className="app">
      <header className="header">
        <h1>Главная</h1>
        {user?.first_name && <p>Привет, {user.first_name}</p>}
      </header>

      <section className="monuments-list">
        {monuments.map((m) => (
          <div key={m.id} className="monument-card">
            <img src={asset(m.image)} alt={m.title} loading="lazy" />
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

