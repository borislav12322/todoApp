import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../BLL/store';
import s from './paginator.module.css';
import { getToDoListsTC, InitialStateType, setCurrentPageAC } from '../../BLL/appReducer';
import ArrowIcon from '../../assets/images/nextArrow.png';
import ArrowIconDouble from '../../assets/images/lastArrow.png';

const Paginator = (): ReactElement => {
  const firstPageNumber = 1;
  const stepForPage = 1;
  const maxPagesCountVisible = 5;
  const hiddenNumbers = 4;
  const dispatch = useDispatch();
  const { currentPage, pageSize, toDoListsCount } = useSelector<
    AppRootStateType,
    InitialStateType
  >(state => state.appReducer);

  const pagesCount = Math.ceil(toDoListsCount / pageSize);

  const pages = [];
  if (pagesCount > maxPagesCountVisible) {
    if (currentPage > maxPagesCountVisible) {
      for (
        let i = currentPage - hiddenNumbers;
        i <= currentPage + maxPagesCountVisible;
        i += stepForPage
      ) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= pagesCount; i += stepForPage) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i += stepForPage) {
      pages.push(i);
    }
  }

  const changePage = (currentPageItem: number): void => {
    dispatch(getToDoListsTC(pageSize, currentPageItem));
    dispatch(setCurrentPageAC(currentPageItem));
  };
  const goToNextPage = (): void => {
    if (currentPage < pagesCount) {
      changePage(currentPage + stepForPage);
    }
  };
  const goToPrevPage = (): void => {
    if (currentPage !== firstPageNumber) {
      changePage(currentPage - stepForPage);
    }
  };
  const goToLastPage = (): void => {
    changePage(pagesCount);
  };
  const goToFirstPage = (): void => {
    changePage(firstPageNumber);
  };

  return (
    <div className={s.numbersWrapper}>
      <button className={s.btnNav} type="button" onClick={goToFirstPage}>
        <img src={ArrowIconDouble} alt="arrow" className={`${s.icon} ${s.iconPrev}`} />
      </button>
      <button className={s.btnNav} type="button" onClick={goToPrevPage}>
        <img src={ArrowIcon} alt="arrow" className={`${s.icon} ${s.iconPrev}`} />
      </button>
      {pages.map(page => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
        <span
          className={s.number}
          key={page}
          onClick={() => changePage(page)}
          role="button"
          style={{
            backgroundColor: page === currentPage ? 'rgba(0,0,0,0.13)' : 'transparent',
          }}
        >
          {page}
        </span>
      ))}
      <button className={s.btnNav} type="button" onClick={goToNextPage}>
        <img src={ArrowIcon} alt="arrow" className={s.icon} />
      </button>
      <button className={s.btnNav} type="button" onClick={goToLastPage}>
        <img src={ArrowIconDouble} alt="arrow" className={s.icon} />
      </button>
    </div>
  );
};

export default Paginator;
