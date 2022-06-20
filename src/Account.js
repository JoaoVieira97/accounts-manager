import { useState } from 'react';

const Account = ({
  account,
  accounts,
  setAccounts,
  setShowAlert,
  setAlertMessage,
  setSelectedAccount
}) => {
  const [emailIconChecked, setEmailIconChecked] = useState(false);
  const [passwordIconChecked, setPasswordIconChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(account.email);
    setEmailIconChecked(true);
    setTimeout(() => setEmailIconChecked(false), 2000);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(account.password);
    setPasswordIconChecked(true);
    setTimeout(() => setPasswordIconChecked(false), 2000);
  };

  const showMoreDetailsHandler = (e) => {
    e.preventDefault();
    setShowMoreDetails(!showMoreDetails);
  };

  const deleteAccount = () => {
    const filteredAccounts = accounts.filter(a =>
      a.title !== account.title || a.email !== account.email || a.password !== account.password
    );
    setAccounts(filteredAccounts);
    setAlertMessage('Accound deleted');
    setShowAlert(true);
    setTimeout(() => {
      setAlertMessage('');
      setShowAlert(false);
    }, 4000);
  };

  return (
    <div className='card'>
      <div className='card__title'>
        <img src={account.image}/>
        <p>{account.title}</p>
      </div>
      <div className='card__detail'>
        <p>
          <span className='card__detail__property'>
            {account.type === 0 ? 'E-mail:' : 'Username:'}
          </span>
          {account.email}
        </p>
        <i
          className={(emailIconChecked ? 'bi-clipboard-check' : 'bi-clipboard') + ' card__detail__icon'}
          title='Copy to clipboard'
          onClick={copyEmailToClipboard}
        />
      </div>
      <div className='card__detail'>
        <p>
          <span className='card__detail__property'>Password:</span>
          {showPassword ? account.password : '**********'}
        </p>
        <div className='card__detail__password'>
          <i
            className={(showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill') + ' card__detail__icon'}
            onClick={() => {setShowPassword(!showPassword)}}
          />
          <i
            className={(passwordIconChecked ? 'bi-clipboard-check' : 'bi-clipboard') + ' card__detail__icon'}
            title='Copy to clipboard'
            onClick={copyPasswordToClipboard}
          />
        </div>
      </div>
      {account?.more && (
        <div className='card__more'>
          <div
            className='card__more__label'
            onClick={showMoreDetailsHandler}
          >
            {showMoreDetails ? (
              <>
                <i className='bi-caret-down-fill'/>
                <p>More details</p>
              </>
            ) : (
              <>
                <i className='bi-caret-right-fill'/>
                <p>More details</p>
              </>
            )}
          </div>
          {showMoreDetails && (
            <div className='card__more__details'>
              <p>{account.more}</p>
            </div>
          )}
        </div>
      )}
      <div className='card__actions'>
        <i
          className={'bi-trash3-fill'}
          title='Delete account'
          onClick={deleteAccount}
        />
        <i
          className={'bi-pencil-fill'}
          title='Edit account details'
          onClick={() => {setSelectedAccount(account)}}
        />
      </div>
    </div>
  );
}

export default Account;
