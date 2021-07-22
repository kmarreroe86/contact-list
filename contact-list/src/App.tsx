import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import CardUser from './components/card-user/CardUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './redux';
import { fetchUsers, deleteUser, editUser, fetchFilteredUsers } from './redux/action-creators/index';
import Loading from './components/loader/Loading';
import { User } from './models/UserAddress';

function App() {
  const dispatch = useDispatch();
  const usersState = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  const onClickRemoveUser = (id: number) => dispatch(deleteUser(id))

  const onClickSave = (id: number, user: User) => dispatch(editUser(id, user));

  const handleSearch = (creiterias: string) => dispatch(fetchFilteredUsers(creiterias));
  


  return (
    <>    
      <Navbar handleSearch={handleSearch}/>  

      <main className="container2 px-3 pt-4">
        {usersState.users && (
          <div className="row">
            <div className="col-12 p-0">
              {usersState.users.map(u => (
                <CardUser
                  key={u.id}
                  model={u}
                  onDeleteClicked={onClickRemoveUser}
                  onClickSave={onClickSave}
                />
              )
              )}
            </div>
          </div>
        )}
      </main>
      {usersState.loading && (<Loading />)}
    </>
  );
}

export default App;
