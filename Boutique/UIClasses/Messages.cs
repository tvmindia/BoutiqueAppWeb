using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boutique.UIClasses
{
    public class Messages
    {
        public static string MandatoryFields
        {
            get { return "Please fill out all the fields"; }
        }
        public static string EmailInstruction
        {
            get { return "Please check your email for a message with verification code.Your code is 4 digit long . We sent code to "; }
        }
        public static string VerificationCodeMismatch
        {
            get { return "Password does not match with the confirm password"; }
        }
        public static string InvalidEmailID
        {
            get { return "Enter A valid Email-ID"; }
        }
        public static string TimeExpired
        {
            get { return "Time expired"; }
        }
        public static string IncorrectVerificationCode
        {
            get { return "Verification Code is invalid"; }
        }
        public static string ErrorNumber
        {
            get { return "Error Number = "; }
        }
        public static string Imagesupport
        {
            get { return "The Image Is not Supporting Save a new one"; }
        }

        //----------------* Messages Captions *--------------//
        #region Captions

        public static string ExceptionMsgCaption
        {
            get { return "Exception!"; }
        }
        public static string SuccessMsgCaption
        {
            get { return "Success!"; }
        }
        public static string WarningMsgCaption
        {
            get { return "Warning!"; }
        }
        public static string InsertionFailureMsgCaption
        {
            get { return "Somthing Wrong try Again!"; }
        }
        public static string FailureMsgCaption
        {
            get { return "Failure!"; }
        }
        public static string AlreadyExistsMsgCaption
        {
            get { return "Already exists!"; }
        }
        public static string Confirm
        {
            get { return "Please Confirm!"; }
        }

        #endregion Captions

        //----------------* Success Messages *--------------//
        #region SuccessMessage

        public static string LoginSuccess
        {
            get { return "Successfully logged in"; }
        }
        public static string InsertionSuccessFull
        {
            get { return "Successfully Inserted"; }
        }
        public static string UpdationSuccessFull
        {
            get { return "Successfully Updated"; }
        }
        public static string DeletionSuccessFull
        {
            get { return "Deleted Successfully"; }
        }
        public static string SuccessfulUpload
        {
            get { return "Successfully Uploaded"; }
        }
        public static string SavedSuccessfull
        {
            get { return "Successfully Saved!"; }
        }
        #endregion SuccessMessage

        //----------------* Failure Messages *--------------//
        #region FailureMessage
        public static string LoginFailed
        {
            get { return "User Name / Password is wrong!"; }
        }
        public static string InsertionFailure
        {
            get { return "Not Successfuly Saved Try Again"; }
        }
        public static string UpdationFailure
        {
            get { return "Edit Failed Try Again Later"; }
        }
        public static string Warning
        {
            get { return "Warning Msg "; }
        }
        public static string DeletionFailure
        {
            get { return "Deletion Not Successful "; }
        }
        public static string SavingFailure
        {
            get { return "Saving Not Successful "; }
        }
        public static string AlreadyUsedForDeletion
        {
            get { return "Already used . Can't be deleted"; }
        }
        public static string AlreadyUsedForUpdation
        {
            get { return "Already used . Can't be changed"; }
        }

        #endregion FailureMessage

    }

}