interface ErrorStateProps {
  error: Error;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
        <div className="text-red-600 text-lg font-medium">Une erreur s'est produite</div>
        <p className="text-red-500 mt-2">{error.message}</p>
      </div>
    </div>
  );
}