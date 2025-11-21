import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, verifyOtp, resetPassword, clearForgotPasswordState } from '../features/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function ForgotPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, otpSent, otpVerified, resetSuccess } = useSelector((s) => s.auth)

    const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Reset state khi component mount
    useEffect(() => {
        dispatch(clearForgotPasswordState())
    }, [dispatch])

    // Chuyển sang bước tiếp theo khi OTP được gửi
    useEffect(() => {
        if (otpSent && step === 1) {
            setStep(2)
        }
    }, [otpSent, step])

    // Chuyển sang bước nhập mật khẩu mới khi OTP được xác thực
    useEffect(() => {
        if (otpVerified && step === 2) {
            setStep(3)
        }
    }, [otpVerified, step])

    // Chuyển về trang login khi reset thành công
    useEffect(() => {
        if (resetSuccess) {
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
    }, [resetSuccess, navigate])

    const handleSendOtp = async (e) => {
        e.preventDefault()
        if (!email) return
        try {
            await dispatch(forgotPassword({ email })).unwrap()
        } catch (err) {
            // Error handled by slice
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        if (!otp) return
        try {
            await dispatch(verifyOtp({ email, otp })).unwrap()
        } catch (err) {
            // Error handled by slice
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (!newPassword || newPassword !== confirmPassword) {
            alert('Mật khẩu không khớp!')
            return
        }
        try {
            await dispatch(resetPassword({ email, otp, newPassword })).unwrap()
        } catch (err) {
            // Error handled by slice
        }
    }

    return (
        <div className="page">
            <div className="card">
                <h2>Quên Mật khẩu</h2>

                {/* Bước 1: Nhập Email */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <p>Nhập email của bạn để nhận mã OTP</p>
                        <label>
                            Email
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                                disabled={loading}
                            />
                        </label>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Đang gửi...' : 'Gửi OTP'}
                        </button>
                        {error && <div className="error">{error}</div>}
                    </form>
                )}

                {/* Bước 2: Nhập OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="success">✅ OTP đã được gửi đến {email}</div>
                        <p>Vui lòng kiểm tra email và nhập mã OTP (6 chữ số)</p>
                        <label>
                            Mã OTP
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                type="text"
                                maxLength="6"
                                required
                                disabled={loading}
                                placeholder="Nhập 6 chữ số"
                            />
                        </label>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
                        </button>
                        {error && <div className="error">{error}</div>}
                        <div style={{ marginTop: 10 }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setStep(1)
                                    dispatch(clearForgotPasswordState())
                                }}
                                style={{ background: 'transparent', color: '#666' }}
                            >
                                ← Quay lại
                            </button>
                        </div>
                    </form>
                )}

                {/* Bước 3: Nhập mật khẩu mới */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="success">✅ OTP hợp lệ</div>
                        <p>Nhập mật khẩu mới của bạn</p>
                        <label>
                            Mật khẩu mới
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                required
                                disabled={loading}
                                minLength="6"
                            />
                        </label>
                        <label>
                            Xác nhận mật khẩu
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                required
                                disabled={loading}
                                minLength="6"
                            />
                        </label>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
                        </button>
                        {error && <div className="error">{error}</div>}
                        {resetSuccess && (
                            <div className="success">
                                ✅ Đặt lại mật khẩu thành công! Đang chuyển về trang đăng nhập...
                            </div>
                        )}
                    </form>
                )}

                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <Link to="/login">Quay lại Đăng nhập</Link>
                </div>
            </div>
        </div>
    )
}
