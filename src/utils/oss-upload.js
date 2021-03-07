import moment from 'moment';
import AliyunOSS from 'aliyun-oss-react-native';

const endPoint = 'oss-cn-shenzhen.aliyuncs.com';
const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};

const bucketname = 'graded-reading';
const urlCdn = 'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/';

//根据AliyunOss配置AccessKey
AliyunOSS.initWithPlainTextAccessKey(
  'LTAI4GB46Jpeom31qLo2c3FM',
  'GmbMzj6CqB5MKwCaqGJbAjNG7EZDJj',
  endPoint,
  configuration,
);

export const uploadOssFile = (filepath) => {
  const filetype = filepath.substring(filepath.lastIndexOf('.')).toLowerCase();
  //获取图片后缀

  const currm = moment(new Date());
  const oo = Math.random();
  const objectKey = `upload/assets/${currm.format(
    'YYYYMM',
  )}/${currm}${oo}${filetype}`;
  // 生成objectKey，作为自定义路径
  return AliyunOSS.asyncUpload(bucketname, objectKey, filepath)
    .then(() => {
      console.log(`${urlCdn}${objectKey}`);
      return `${urlCdn}${objectKey}`;
    })
    .catch((error) => {
      console.log('=== error', error);
    });
};
