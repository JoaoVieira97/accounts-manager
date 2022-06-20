import { useState, useEffect } from 'react';
import Account from './Account';
import AddOrEditAccount from './AddOrEditAccount';
import { list_accounts } from './utils/accounts';
import './App.scss';
import _ from 'lodash';

const App = () => {
  const localStorage_accounts = localStorage.getItem('accounts');
  const [accounts, setAccounts] = useState(localStorage_accounts ? JSON.parse(localStorage_accounts) : list_accounts);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const refreshUnsavedChanges = () => {
    const saved_accounts = JSON.parse(localStorage.getItem('accounts'));
    const unsaved = !_.isEqual(accounts, saved_accounts);
    setUnsavedChanges(unsaved);
  };

  useEffect(() => {
    refreshUnsavedChanges();
  }, [accounts]);

  useEffect(() => {
    if (!_.isEmpty(selectedAccount)) {
      setShowModal(true);
    }
  }, [selectedAccount]);

  const saveChanges = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
    setAlertMessage('Changes saved');
    setShowAlert(true);
    refreshUnsavedChanges();
    setTimeout(() => {
      setAlertMessage('');
      setShowAlert(false);
    }, 4000);
  };

  return (
    <div className='app'>
      <div className='title_section'>
        <p>Accounts Manager</p>
        <i className='bi-key title_section__icon'/>
      </div>
      <div className='wrapper'>
        {accounts.map((account) => 
          <Account
            key={account.id}
            account={account}
            accounts={accounts}
            setAccounts={setAccounts}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setSelectedAccount={setSelectedAccount}
          />
        )}
      </div>
      <div className='buttons'>
        <div className='buttons__button'>
          <i
            className='bi-person-plus'
            title='Add account'
            onClick={() => {setShowModal(true)}}
          />
        </div>
        <div className={'buttons__button' + (unsavedChanges ? '' : ' buttons__button__disabled')}>
          <i
            className='bi-save'
            title='Save changes'
            onClick={saveChanges}
          />
        </div>
      </div>
      {showModal &&
        <AddOrEditAccount
          accounts={accounts}
          setAccounts={setAccounts}
          setShowModal={setShowModal}
          setShowAlert={setShowAlert}
          setAlertMessage={setAlertMessage}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      }
      {showAlert &&
        <div className='alert'>
          <p>{alertMessage}</p>
        </div>
      }
    </div>
  );
}

export default App;
