import { Tag, notification, Tooltip, Badge, Row, Dropdown, Space } from 'antd';
import {
  CalendarOutlined,
  CrownOutlined,
  BulbOutlined,
  AlertOutlined,
  BellOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { ETypeNotification, ERegex } from '../common/enums';

const COLORS = [
  '#1890ff',
  '#ff4d4f',
  '#b37feb',
  '#faad14',
  '#329ac5',
  '#52c41a',
  '#ffa940',
  '#f56256',
  '#faad14',
  '#1890ff',
];

export const removeAccents = (str) => {
  let strConverted = str;
  if (strConverted) {
    strConverted = strConverted.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    strConverted = strConverted.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    strConverted = strConverted.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    strConverted = strConverted.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    strConverted = strConverted.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    strConverted = strConverted.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    strConverted = strConverted.replace(/đ/g, 'd');
    strConverted = strConverted.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    strConverted = strConverted.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    strConverted = strConverted.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    strConverted = strConverted.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    strConverted = strConverted.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    strConverted = strConverted.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    strConverted = strConverted.replace(/Đ/g, 'D');

    strConverted = strConverted.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    strConverted = strConverted.replace(/\u02C6|\u0306|\u031B/g, '');
    // Remove extra spaces
    strConverted = strConverted.replace(/ + /g, ' ');
    strConverted = strConverted.trim();
    // Remove punctuations
    strConverted = strConverted.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' ',
    );
    return strConverted;
  }

  return '';
};

export const showNotification = (type, description) => {
  const options = {
    message: '',
    description,
    className: 'Notification',
  };

  switch (type) {
    case ETypeNotification.SUCCESS:
      notification.success(options);
      break;
    case ETypeNotification.WARNING:
      notification.warning(options);
      break;
    case ETypeNotification.ERROR:
      notification.error(options);
      break;
    case ETypeNotification.INFO:
      notification.info(options);
      break;
    default:
      notification.open(options);
  }
};
export function getParameterQuery() {
  let parameter = {};
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    parameter[param[0]] = param[1];
  }
  return parameter;
}
export const searchString = (target, searchValue) => {
  const searchKey = searchValue.toLowerCase();
  const searchTarget = target instanceof Array ? target.map((str) => str.toLowerCase()) : target.toLowerCase();
  const searchResult =
    searchTarget instanceof Array
      ? !!searchTarget.filter((str) => removeAccents(str).includes(removeAccents(searchKey))).length
      : removeAccents(searchTarget).includes(removeAccents(searchKey));
  return searchResult;
};

export const getTotalPage = (totalItem, pageSize) => {
  return Math.ceil(totalItem / pageSize);
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const validationRules = {
  required: (message) => ({
    required: true,
    message: message || 'This field is required',
  }),
  minLength: (length = 2, message) => ({
    min: length,
    message: message || `Enter characters at least ${length}`,
  }),
  maxLength: (length = 10, message) => ({
    max: length,
    message: message || `Enter characters at most ${length}`,
  }),
  email: (message) => ({
    type: 'email',
    message: message || 'Invalid email',
  }),
  noSpecialKey: (message) => ({
    validator: (rule, value) => {
      if (!value || !ERegex.onlySpecialKey.test(value)) return Promise.resolve();
      return Promise.reject(message || 'Cannot enter special characters');
    },
  }),
  onlyAlphabetic: (message) => ({
    validator: (rule, value) => {
      if (!value || ERegex.alphabetic.test(removeAccents(value))) return Promise.resolve();
      return Promise.reject(message || 'This is a field where only alphabetic characters are entered');
    },
  }),
  onlyNumeric: (message) => ({
    validator: (rule, value) => {
      if (!value || ERegex.numeric.test(value)) return Promise.resolve();
      return Promise.reject(message || 'This is a field where only numeric characters are entered');
    },
  }),
  onlyAlphanumerial: (message) => ({
    validator: (rule, value) => {
      if (!value || ERegex.alphanumerial.test(removeAccents(value))) return Promise.resolve();
      return Promise.reject(message || 'This is a field where only alphanumeric characters are entered');
    },
  }),
  domain: (message) => ({
    validator: (rule, value) => {
      if (!value || ERegex.domain.test(value)) return Promise.resolve();
      return Promise.reject(message || 'Invalid domain');
    },
  }),
  url: (message) => ({
    validator: (rule, value) => {
      if (!value || ERegex.url.test(value)) return Promise.resolve();
      return Promise.reject(message || 'Invalid URL');
    },
  }),
  confirmPassword: (confirmPasswordValue, message) => ({
    validator: (rule, value) => {
      if (!value || value === confirmPasswordValue) return Promise.resolve();
      return Promise.reject(message || 'Confirm Password is not matched with Password');
    },
  }),
};

export const copyText = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const renderSortByString = (field, direction) => {
  if (!direction || !field) return undefined;
  let newDirection = '';
  if (direction === 'ascend') newDirection = '1';
  if (direction === 'descend') newDirection = '0';
  return `${field}:${newDirection}`;
};

export const getQueryParam = (param) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};

export const getTotalItems = (totalItem, pageSize, total) => {
  return (totalItem - 1) * pageSize + total;
};

export const encodeQueryParams = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

const checkStyleBadge = (badge) => {
  switch (badge) {
    case 'Built for your business':
      return {
        color: '#74c94f',
        icon: <CalendarOutlined />,
      };
    case 'Popular with businesses like yours':
      return {
        color: '#74c94f',
        icon: <CrownOutlined />,
      };
    case 'Speed tested: no impact to your online store':
      return {
        color: '#74c94f',
        icon: <BulbOutlined />,
      };
    default:
      return {
        color: '#74c94f',
        icon: <AlertOutlined />,
      };
  }
};

export const renderBadge = (hightlights) => {
  if (hightlights) {
    return hightlights.map((item, index) => {
      return (
        <Tag key={index} color={checkStyleBadge(item).color} icon={checkStyleBadge(item).icon} className="hightlights">
          {item}
        </Tag>
      );
    });
  }
};

const getTitleChanges = (changes) => {
  return Object.keys(changes).map((item) => {
    const name = item.replaceAll('_', ' ');
    if (name == 'review count') {
      return 'Reviews';
    }
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  });
};

const contentChanges = (changes) => {
  return (
    <div className="list-change">
      <ul style={{ margin: 0, paddingLeft: '0px', listStyleType: 'none' }}>
        {getTitleChanges(changes).map((item, index) => (
          <li key={index} style={{ color: COLORS[index] }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getNoti = (app, isDetailApp) => {
  if (app.changed && Object.keys(app.changed).length > 0 && !app.watched_changes) {
    const nbChanges = Object.keys(app.changed).length;
    return (
      <Tooltip title={contentChanges(app.changed)} color="#ffffff">
        <Badge count={nbChanges}>
          <BellOutlined
            style={{
              fontSize: '16px',
              marginLeft: isDetailApp ? '-5px' : '5px',
            }}
          />
        </Badge>
      </Tooltip>
    );
  }
};

export const getReviewChanges = (after, before) => {
  const changes = after - before;
  return `${changes > 0 ? '+' : ''}${changes} ${changes > 1 ? 'reviews' : 'review'}`;
};

export const footerButton = (children, skipAction) => {
  return (
    <Row justify="space-between">
      <div className="onboarding-skip" onClick={() => skipAction()}>
        Skip
      </div>
      {children ? <div>{children}</div> : <></>}
    </Row>
  );
};

export const renderSentiment = (type) => {
  switch (type) {
    case 'negative':
      return '&negative=true';
    case 'positive':
      return '&positive=true';
    case 'objective':
      return '&objective=true';
    case 'subjective':
      return '&subjective=true';
    default:
      return '';
  }
};

export const renderFilterDropdown = (options, title, value) => {
  return (
    <Dropdown overlay={options}>
      <Space>
        <div className="sort-container flex items-center">
          {title}:<div className="sort-value text-capitalize">{value}</div>
          <DownOutlined />
        </div>
      </Space>
    </Dropdown>
  );
};


const CANT_CONNECT_INTERNET = "Can't connect internet";
export function fetchWithTimeOut(promise, ms = 25000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(CANT_CONNECT_INTERNET));
    }, ms);
    promise.then(resolve, reject);
  });
}
