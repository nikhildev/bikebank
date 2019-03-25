import * as React from 'react';
import { connect } from 'react-redux';
// import Avatar from '@material-ui/core/Avatar';
import { FaSearch } from 'react-icons/fa';

import './AppToolbar.css';
import { UserDispatchProps } from '../../types/user';
import { requestUserLogin, requestUserLogout } from 'src/actions/user';
import { history } from '../../store';

interface Props {
  appTitle: string;
}

interface State {
  searchString: string;
}

interface MappedDispatchProps {
  requestUserLogin: Function;
  requestUserLogout: Function;
}

interface MappedStateProps {
  user: UserDispatchProps;
}

class AppToolbar extends React.Component<MappedDispatchProps & MappedStateProps & Props, State> {
  readonly state: State = {
    searchString: '',
  };

  private handleLogoutClick = async () => {
    this.props.requestUserLogout();
  };

  private handleSearchClick = () => {
    history.push(`/search/${this.state.searchString}`);
  };

  private handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: event.currentTarget.value.toString(),
    });
  };

  public render() {
    return (
      <div id="AppToolbar">
        <div id="AppTitle">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASHSURBVFhH7VVdaBxVFB619sEXQdEnffCnCoIIKopaW2qzsxttg5LESvx5bDVU8UFSrGlXLd2ZqWmSZreZTdEHK8WaFyumj1LQ7MxkZ9LNz0rFNv5E24RELULTUNzd6/nGs7KznUlimH0Q9oPLzD3n3O+ee+4550p11FFHHf9zRFVTBA7FPB9LmE+z6eohq8ZJ3w1oyKr5K5v5gpw4Rut38tSDqGY8uNz6FYE2+NPPOdr856iaibKZL2TN2kR2OZ560KCNPByKg+TMG0Q0Jyvmd1HVsOSE8U2DZq5j9dIQ4hpaMwVnWOKCOM/AuYhqNrIoHMj7srfLijH/0IBzPYuWRVQxdtPo52ntQVde8Fz1SoZiXNoSd25gitqBnHuEruY3urYBFq0IlIdfRjXrZZ7WDhSNjygXNeRk6+DgdSxeFnSwlKxkxnlaGzSozo3k2B+RDzK3UgQdVCirlkREsZ6ivJ0hJ+caEyP3sDh8xDSznaL3Gf7JwbcRFVexBKLa8L2INl3vk7RGxWBV+CDnJhAN/KPNkIMX4nFxrav0QWz/17dQSpyl6L2COaKHNRvjp9a4BqtB/JRYs+OTc6k2PT+7tTtbjB2wBL4tqdzvjQesi9sd8W97oY3HERmeetAaz6+laH1F1auwyOV+pit7vjl5+mIld5s+OYs9oWdTf7x+/MdNLX1jC23pvOgcmhe9mUXRny243xcH8uK5QznRkswtvHZseiPsycG9VJ097uIqULQ/JP0XaNSYl7mbk2Ni2+EJD/eek/MCe1ZyX4X2T3/a3NRjF3edmBFpp+gZfdYVsaUrK/rMKwL6pm6nCKLYfus+cuKXshNlyKr1Fp63ct+r5D488pfYetAWvcOLV+1Tye0SlYHQNidzlzvYOd0uLOhOYW9/Vtw5mBdrmw+N7dvWPzmRdgqXoe/4fEa0JnOXsI5y6ttIwnyUqagozCa80THVug1zP+6XjuSzz/aMdoE7bZfuwl5+3C4h8OrH3ycR4jJBerT0GKtcUJTyESWzYSBbetzVkx3sdxw910e69ynXumDXqBj30/9spcN+3HiXyW6qMvJ+3KySJBQEcg7KtF3Yw2IXMdVcT5V4pkym28V3Ydc5NEdEEzOyYj1AhfDDPxVrTNN43l3ICOJGClT30WpuFksS5UQRyQrlEat0B4ulzYmRm2lDh6LXySIpNVq6G3bIIcqXAmR0iLN0iEkansMBQdyyZu6i/jiKPVjky+0C5Y6KghJ5wWI8T2/Spv6Pf9WIKcZQdbEAQdxRZXg31mEPFkluTpId7LGOxd5TojBY7EYQBPJB4yYWSfrp0jrfUwYgFG40SvQiKKma4iz2Rdouvge7d6rzJAChcFdXGiqKVR7odukJtAOd7Cj5xfajU72sCkQo3Og56OLoQS6RU1hEb0LSIi/wRYVBDn3HiQuiJTXu7VUBCI0bT1HQS1I5sFFTt11sPz69gZcui9C48cTgtAgxehGSFRXVQ0mO+Qv6pNvl/4tzZYTGjdCiiyNJUUkod3wxR16s5FqDUEvuOuqoo45VQZL+BgDu+WGSOSalAAAAAElFTkSuQmCC" />
        </div>
        <div id="ToolbarSearch">
          <FaSearch style={{ marginRight: 4, color: '#03a9f4' }} />
          <input type="text" id="ToolbarSearchBox" onChange={this.handleSearchTextChange} />
          <button id="ToolbarSearchButton" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
        <div>
          {this.props.user.user && (
            <div onClick={this.handleLogoutClick}>
              {/* <Avatar
                id="ToolbarAvatar"
                alt="User Name"
                src={this.props.user.user.photoURL || ''}
              /> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: MappedStateProps): MappedStateProps {
  return {
    user: state.user || false,
  };
}

const mapDispatchToProps: MappedDispatchProps = {
  requestUserLogin,
  requestUserLogout,
};

export default connect<MappedStateProps, MappedDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AppToolbar);
