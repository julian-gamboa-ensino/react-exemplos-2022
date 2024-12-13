import { useState } from 'react';
import { Auth } from 'aws-amplify';
import QRCode from 'qrcode';

const SetupTOTP = ({ user }) => {
    const [qrCodeURL, setQRCodeURL] = useState(null);
    const [totpCode, setTotpCode] = useState('');
    const [status, setStatus] = useState('');

    const generateQRCode = async () => {
        try {
            // Obter o secret do TOTP
            const secretCode = await Auth.setupTOTP(user);

            // Criar a URL TOTP
            const totpURL = `otpauth://totp/${encodeURIComponent(user.username)}?secret=${secretCode}&issuer=YourAppName`;

            // Gerar o código QR
            const qrCode = await QRCode.toDataURL(totpURL);
            setQRCodeURL(qrCode);
        } catch (error) {
            console.error('Erro ao configurar TOTP:', error);
            setStatus('Erro ao configurar TOTP. Tente novamente.');
        }
    };

    const verifyTOTPCode = async () => {
        try {
            // Verificar o código TOTP inserido pelo usuário
            await Auth.verifyTotpToken(user, totpCode);
            setStatus('TOTP configurado com sucesso!');
        } catch (error) {
            console.error('Erro ao validar TOTP:', error);
            setStatus('Erro ao validar o código TOTP. Verifique e tente novamente.');
        }
    };

    return (
        <div>
            <h2>Configurar TOTP</h2>
            {!qrCodeURL && (
                <button onClick={generateQRCode}>Gerar QR Code</button>
            )}
            {qrCodeURL && (
                <>
                    <p>Escaneie este código QR com seu aplicativo autenticador:</p>
                    <img src={qrCodeURL} alt="QR Code para TOTP" />
                    <div>
                        <label>
                            Insira o código gerado pelo aplicativo:
                            <input
                                type="text"
                                value={totpCode}
                                onChange={(e) => setTotpCode(e.target.value)}
                                placeholder="Código MFA"
                            />
                        </label>
                        <button onClick={verifyTOTPCode}>Validar TOTP</button>
                    </div>
                </>
            )}
            {status && <p>{status}</p>}
        </div>
    );
};

export default SetupTOTP;
