import React, { ReactElement } from 'react';
import s from './mainPage.module.css';
import todoImg from '../../assets/images/todoImg.jpeg';

const MainPage = (): ReactElement => (
  <div className={s.mainPageWrapper}>
    <h1 className={s.title}>To Do List Application</h1>
    <div className={s.descriptionWrapper}>
      <p className={s.description}>
        <span className={s.textBold}>Improves your memory:</span> A to do list acts as an
        external memory aid. It’s only possible to hold a few pieces of information at one
        time. Keep a to do list and you’ll be able to keep track of everything, rather
        than just a few of the tasks you need to do. Your to do list will also reinforce
        the information, which makes it less likely you’re going to forget something.
      </p>
      <p className={s.description}>
        <span className={s.textBold}>Increases productivity:</span> A to do list allows
        you to prioritize the tasks that are more important. This means you don’t waste
        time on tasks that don’t require your immediate attention. Your list will help you
        stay focused on the tasks that are the most important.
      </p>
      <p className={s.description}>
        <span className={s.textBold}>Helps with motivation:</span> To do lists are a great
        motivational tool because you can use them to clarify your goals. You can divide
        your long-term goal into smaller, more achievable short-term goals and as you tick
        each one off your list, your confidence will increase
      </p>
    </div>
    <img className={s.img} src={todoImg} alt="todo" />
  </div>
);

export default MainPage;
