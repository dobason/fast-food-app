// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomPasswordTextField from '@/lib/ui/useable-components/password-input-field';

// Hooks
import { useAuth } from '@/lib/context/auth/auth.context';
import useToast from '@/lib/hooks/useToast';
import { useTranslations } from 'next-intl';
import { useLogin } from '@/lib/api/restful/hooks/useUser';

// Interfaces
import { IAuthFormData, IEnterPasswordProps } from '@/lib/utils/interfaces';
import PasswordIcon from '@/lib/utils/assets/svg/password';
export default function EnterPassword({
  handleChangePanel,
  handleFormChange,
  setFormData,
  formData,
}: IEnterPasswordProps) {
  // Hooks
  const t = useTranslations();
  const { setUser, setIsAuthModalVisible } = useAuth();
  const { showToast } = useToast();
  const { mutate: login, isPending: isLoading } = useLogin();

  // Handlers
  const handleSubmit = () => {
    if (!formData?.password || !formData?.email) {
      return showToast({
        type: 'error',
        title: t('error'),
        message: t('please_enter_valid_password_message'),
      });
    }

    // Login using the useLogin mutation
    login(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          // Update user context with returned user data
          if (data.user) {
            setUser(data.user);
          }

          showToast({
            type: 'success',
            title: t('Login'),
            message: t('login_successful') || 'Login successful!',
          });

          // User is fully verified, close modal
          handleChangePanel(0);
          setFormData({} as IAuthFormData);
          setIsAuthModalVisible(false);
        },
        onError: (error) => {
          showToast({
            type: 'error',
            title: t('error'),
            message: error.message || t('please_enter_valid_password_message'),
          });
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8 py-6 dark:bg-gray-900 dark:text-white">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-start">
            <PasswordIcon />
            <div className="mt-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                {t('good_to_see_you_again')}
              </h3>
              <p className="text-gray-600  mt-1 text-sm sm:text-base">
                {t('enter_password_to_login')}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <CustomPasswordTextField
              value={formData?.password}
              showLabel={false}
              name="password"
              placeholder={t('password')}
              onChange={(e) => handleFormChange('password', e.target.value)}
            />

            <CustomButton
              label={t('continue_label')}
              loading={isLoading}
              className="bg-[#5AC12F] w-full rounded-full border border-gray-300 p-3"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
