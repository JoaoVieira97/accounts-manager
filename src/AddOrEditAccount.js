import { useState } from 'react';

const initialFormData = {
  email: '',
  password: '',
  image: '',
  more: '',
  title: ''
};

const AddOrEditAccount = ({
  accounts,
  setAccounts,
  setShowModal,
  setShowAlert,
  setAlertMessage,
  selectedAccount,
  setSelectedAccount
}) => {
  const [accountType, setAccountType] = useState(selectedAccount?.type || 0);
  const [formData, setFormData] = useState(selectedAccount || initialFormData);

  const dataChangeHandler = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formDataIsCompleted = () => {
    const { email, password, image, title } = formData;
    return email !== '' && password !== '' && image !== '' && title !== '';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAccount(null);
    setAccountType(0);
    setFormData(initialFormData);
  };

  const saveData = () => {
    const { email, password, image, more, title } = formData;
    if (selectedAccount) {
      const newAccounts = [...accounts];
      const accountIndex = newAccounts.findIndex(a => a.id === selectedAccount.id);
      newAccounts[accountIndex] = {
        id: selectedAccount.id,
        title,
        image,
        type: accountType,
        email,
        password,
        more
      };
      setAccounts(newAccounts);
      setAlertMessage('Account changed');
    } else {
      setAccounts([
        ...accounts,
        {
          id: Math.random().toString(10).slice(2),
          title,
          image,
          type: accountType,
          email,
          password,
          more
        }
      ]);
      setAlertMessage('Account added');
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedAccount(null);
    }, 1000);
    setTimeout(() => {
      setAlertMessage('');
      setShowAlert(false);
    }, 4000);
  };

  return (
    <div className='modal'>
      <div className='modal__content'>
        <i
          className='bi-x-lg modal__content__close'
          onClick={closeModal}
        />
        <div className='modal__content__form'>
          <label>
            Service name:
            <input type='text' name='title' value={formData.title} onChange={dataChangeHandler}/>
          </label>
          <p>Account type:</p>
          <label className='modal__content__form__radio'>
            e-mail and password
            <input
              type='radio'
              name='radio'
              checked={!accountType ? true : false}
              readOnly
              onClick={() => {setAccountType(0)}}
            />
            <span className='checkmark'></span>
          </label>
          <label className='modal__content__form__radio'>
            username and password
            <input
              type='radio'
              name='radio'
              checked={accountType ? true : false}
              readOnly
              onClick={() => {setAccountType(1)}}
            />
            <span className='checkmark'></span>
          </label>
          <label>
            {accountType ? 'Username:' : 'E-mail:'}
            <input type='text' name='email' value={formData.email} onChange={dataChangeHandler}/>
          </label>
          <label>
            Password:
            <input type='text' name='password' value={formData.password} onChange={dataChangeHandler}/>
          </label>
          <label>
            Image URL:
            <input type='text' name='image' value={formData.image} onChange={dataChangeHandler}/>
          </label>
          <p>Other details:</p>
          <textarea name='more' rows='5' value={formData.more} onChange={dataChangeHandler}/>
          <button
            disabled={!formDataIsCompleted()}
            onClick={saveData}
          >
            {selectedAccount ? 'CHANGE' : 'ADD'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrEditAccount;