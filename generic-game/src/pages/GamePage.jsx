import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  patchGameLost,
  patchGameWon,
} from '../actions/creators/profile';
import { Authorize } from '../components/auth';
import { Creature } from '../components/profile';
import { Button } from '../components/ui';
import { gameEnded, gameStarted } from './../actions/creators/game';
export const GamePage = () => {
  const dispatch = useDispatch();
  // this will render whole page
  const { playing } = useSelector(({ game }) => {
    return game;
  });

  const { gameState, setGameState } = useState({ playing: false });

  useEffect(() => {
    return () => {
      dispatch(gameEnded());
    };
  }, [dispatch]);
  // no array - ran at all operations
  // with array - only when mounted
  // with dependancies - when dependancies change (1 or more)

  return (
    <div className="p-4 container mx-auto flex">
      <Authorize roles={['admin', 'super-admin', 'trainer']}>
        <div className="w-full md-w-8/12 mb-2 flex items-center justify-around">
          {playing ? (
            <>
              <Button
                title="win game"
                type="button"
                onClick={() => {
                  dispatch(patchGameWon());
                  dispatch(gameEnded());
                }}>
                win game
              </Button>
              <Button
                title="lose game"
                type="button"
                skin="dangerInverted"
                onClick={() => {
                  dispatch(gameEnded());
                }}>
                lose game
              </Button>
              <Button
                title="quit game"
                type="button"
                skin="danger"
                onClick={() => {
                  dispatch(gameEnded());
                }}>
                quit game
              </Button>
            </>
          ) : (
            <Button
              title="start game"
              type="button"
              onClick={() => {
                dispatch(patchGameLost());
                dispatch(gameEnded());
              }}>
              start game
            </Button>
          )}
        </div>
        <div className="w-full md:w-4/12 flex flex-col justifyt-content items-center">
          <Creature></Creature>
        </div>
      </Authorize>
    </div>
  );
};

export default GamePage;
