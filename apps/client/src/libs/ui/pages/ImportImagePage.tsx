'use client'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, notification, Typography, Upload } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useMutation from '../../common/hooks/useMutation';
import { maxImageSize, urlImage } from '../../shared/constants/common';
import { convertByteToMB, IObject } from '../../shared/utils/constant';

export default function ImportImagePage() {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { Title } = Typography;
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [disableCancelButton, setDisableCancelButton] =
    useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<IObject | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { Dragger } = Upload;
  const {
    error: errorImport,
    loading: loadingButton,
    mutate: importMedia,
  } = useMutation(urlImage, { method: 'POST', bodyType: 'form-data' });

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (errorImport) setErrorDetails(errorImport);
  }, [errorImport]);

  const handleOk = async () => {
    if (!file) return;

    const response = await importMedia({ file });
    if (response && response.code) {
      notification.success({
        message: 'Success',
        description: t('common.import_success'),
      });
      resetModel();
    }
  };

  const handleCancel = () => {
    setDisableCancelButton(true);
    if (file) {
      Modal.confirm({
        title: t('common.clear_import'),
        okText: t('common.btn_ok'),
        cancelText: t('common.btn_no'),
        onOk: () => {
          resetModel();
          setDisableCancelButton(false);
        },
        onCancel: () => {
          setDisableCancelButton(false);
        },
      });
    } else {
      resetModel();
      setDisableCancelButton(false);
    }
  };

  const resetModel = () => {
    handleRemove();
    setRefreshKey((prevKey) => prevKey + 1);
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    setFile(null);
    setFileSize(0);
    setDisableButton(true);
    setErrorDetails(null);
  };

  const customRequest: UploadProps['customRequest'] = ({
    onProgress,
    onSuccess,
  }) => {
    if (!onProgress || !onSuccess) return;
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress({ percent: progress });
        if (progress >= 100) {
          clearInterval(interval);
          onSuccess({ data: 'ok', status: 200, statusText: 'OK' });
        }
      }, 100);
    };

    simulateProgress();
  };

  const props: UploadProps = {
    onChange: (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'done') {
        setFile(info.file.originFileObj as File);
        setDisableButton(false);
      }
      setErrorDetails(null);
    },
    beforeUpload(file: File) {
      const isImage = /\.(jpg|jpeg|png)$/i.test(file.name);
      const fileSize = convertByteToMB(file.size);
      const maxSize = fileSize < maxImageSize;

      if (!isImage) {
        message.error(t('common.msg.MSG_003'));
        return Upload.LIST_IGNORE;
      }

      if (!maxSize) {
        message.error(t('common.msg.MSG_004', { max_size: '5MB' }));
        return Upload.LIST_IGNORE;
      }

      setFileSize(fileSize);
      return true;
    },
    onRemove: handleRemove,
    onDrop(e) {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const droppedFile = files[0];
        const isImage = /\.(jpg|jpeg|png)$/i.test(droppedFile.name);
        if (!isImage) {
          message.error(t('common.msg.MSG_003'));
          return;
        }

        setFile(droppedFile);
        setDisableButton(false);
        setErrorDetails(null);
      }
    },
    listType: 'picture',
    accept: '.jpg,.jpeg,.png',
    showUploadList: { showRemoveIcon: true },
    maxCount: 1,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    customRequest: customRequest,
  };

  return (
    <div className="w-full p-4">
      <Title level={3}>{t('common.import_image')}</Title>
      <Button
        icon={<UploadOutlined />}
        onClick={showModal}
        size="large"
        type="primary"
        className="my-5 bg-[#1677ff]"
      >
        {t('common.import')}
      </Button>
      <Modal
        key={refreshKey}
        title={t('common.title_popup_import')}
        closable={!disableCancelButton}
        okButtonProps={{ disabled: disableButton }}
        okText={t('common.import')}
        width={1000}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <>
            <Button
              className="ant-btn ant-btn-danger"
              disabled={disableCancelButton}
              onClick={handleCancel}
            >
              {t('common.cancel')}
            </Button>
            <Button
              key="submit"
              className="ant-btn ant-btn-primary"
              loading={loadingButton}
              onClick={handleOk}
              disabled={disableButton}
            >
              {t('common.import')}
            </Button>
          </>,
        ]}
      >
        <Dragger
          {...props}
          disabled={loadingButton}
          className="upload-list-inline"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{t('common.title_drag_file')}</p>
          <Button
            icon={<UploadOutlined />}
            disabled={loadingButton}
            className="mb-1 bg-[#1677ff] text-[#FFFF] hover:!text-[#FFF]"
          >
            {t('common.title_upload')}
          </Button>
          <p className="ant-upload-hint">
            {t('common.upload_image_description')}
          </p>
        </Dragger>
        {fileSize > 0 && (
          <p className="mb-5 mt-[-10px] text-end">{fileSize} MB</p>
        )}

        {errorDetails && (
          <div className="max-h-[400px] overflow-y-scroll">
            <Title level={4} className="mb-5 !text-[red]">
              {t('common.error_detail')}:{' '}
            </Title>
          </div>
        )}
      </Modal>
    </div>
  );
}
