import {css, cx} from '@emotion/css';
import {useEffect, useMemo, useRef, memo} from 'react';
import {default as chance} from 'chance';
import 'magic.css/dist/magic.css';
import {magicClassNameList} from '../animations/magic';
import gsap from 'gsap';
import {usePrevious} from '../hooks/usePrevious';

const Page = ({tik, notifier, children}) => {
  const itemDomRef = useRef(null);

  const magicClassName = useMemo(() => {
    return gsap.utils.wrap(magicClassNameList)(
      chance().integer({min: 0, max: magicClassNameList.length - 1})
    );
  }, [magicClassNameList, tik]);

  const lastValue = usePrevious(magicClassName);

  useEffect(() => {
    if (!tik) {
      return;
    }
    const itemDom = itemDomRef.current;
    itemDom.classList.remove(`magictime`, lastValue);
    itemDom.classList.add(`magictime`, magicClassName);
  }, [tik]);

  return (
    <div
      ref={itemDomRef}
      className={css`
        min-height: 22rem;
        max-width: 20rem;
        width: 100%;
        border: 1px solid;
        background: wheat;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        &.magictime {
          animation-duration: 1700ms;
        }
      `}
      onAnimationStart={(e) => {
        const html = document.documentElement;
        const body = html.querySelector('body');
        html.classList.add('loading');
        body.classList.add('loading');
      }}
      onAnimationEnd={(e) => {
        const html = document.documentElement;
        const body = html.querySelector('body');
        html.classList.remove('loading');
        body.classList.remove('loading');

        // this line opt in or out depend on usecase.
        const dom = e.target;
        dom.classList.remove(`magictime`, magicClassName);
        notifier('done');
      }}
    >
      <h2>{tik ? magicClassName : `Press Do`}</h2>
      {children}
    </div>
  );
};

export default memo(Page);
