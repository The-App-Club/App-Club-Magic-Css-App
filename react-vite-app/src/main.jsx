import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useState} from 'react';
import '@fontsource/inter';
import './styles/index.scss';
import {Button} from '@mui/material';
import Page from './components/Page';

const App = () => {
  const [disable, setDisable] = useState(false);
  const [tik, setTik] = useState(null);
  const handleDo = (e) => {
    setTik(new Date());
    setDisable(true);
  };

  const notifier = useCallback((e) => {
    // console.log(e);
    setDisable(false);
  }, []);

  return (
    <>
      <Button
        disabled={disable}
        className={css`
          position: fixed;
          top: 1rem;
          left: 1rem;
        `}
        variant={'outlined'}
        onClick={handleDo}
      >
        Do
      </Button>
      <div
        className={css`
          display: grid;
          place-items: center;
          min-height: 100vh;
          width: 100%;
        `}
      >
        <Page tik={tik} notifier={notifier}>
          <p>something bebop...</p>
        </Page>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
